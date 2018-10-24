(function () {
  /**
   * Verkefni 7 – Reikniæfingarforrit
   *
   * Forrit sem æfir hraða í að reikna einföld dæmi
   */

  // fasti sem segir til um hve marga leiki eigi að spila
  const GAMES_TO_PLAY = 10;
  let cancel = false;

  /**
   * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
   * með kalli í play().
   * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
   */
  function start() {
    let again = true;
    alert(`Markmiðið er að svara sem flestum af ${GAMES_TO_PLAY} dæmum rétt, á sem skemmstum tíma`);
    while (again) {
      const start = Date.now();
      let cnt = 0;
      let correct = 0;
      while (cnt++ < GAMES_TO_PLAY) {
        if (play()) correct++;
        if (cancel) break;
      }
      if (!cancel) {
        const stop = Date.now();
        const time = (stop - start) / 1000;
        alert(`Þú svaraðir ${correct} spurningum af ${GAMES_TO_PLAY} rétt á ${time.toFixed(2)} sekúndum.
Meðaltal réttra svara á sekúndu er: ${(correct / time).toFixed(2)}`);
      }
      again = confirm("Spila aftur?");
    }
  }


  /**
   * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
   * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
   *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
   *   Meðalrétt svör á sekúndu eru Z
   * Þar sem Y og Z hafa tvo aukastafi.
   *
   * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
   * upplsýingar um niðurstöður.
   *
   */
  function play() {
    // finna aðgerð fyrir spurningu
    const virki = randomNumber(1, 4);

    // finna tölurnar í dæmið
    let a = randomNumber(1, 100);
    let b = randomNumber(1, 100);
    if (virki > 2) {
      a = randomNumber(1, 10);
      b = randomNumber(1, 10);
      if (virki === 4) {
        a = b * randomNumber(1, 10);
      }
    }

    // spyrja spurningar og fá svar
    const reply = ask(virki, a, b);
    if (null === reply || isNaN(reply)) {
      alert("Hætt í leik.");
      cancel = true;
      return false;
    }

    // finna rétt svar
    let answer = calcReply(virki, a, b);

    // skila sanngildi leiksins
    return parseInt(reply, 10) === answer;
  }


  /**
   * fallið fær inn virkjann (+, - * /), reiknar tilsvarandi
   *  a + b, a - b, a * b eða a / b, og skilar útkomunni.
   */
  function calcReply(virki, a, b) {
    switch (virki) {
      case 1:
        answer = a + b;
        break;
      case 2:
        answer = Math.floor(a - b);
        break;
      case 3:
        answer = a * b;
        break;
      default:
        answer = a / b;
    }
    console.log(answer);
    return answer;
  }

  /**
   * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
   * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
   * svara í og túlkar svarið yfir í tölu.
   *
   * Mögulegar spurningar eru:
   * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
   * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
   * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
   * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
   *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
   *
   * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
   */
  function ask(type, a, b) {
    // 
    let op = '';
    switch (type) {
      case 1:
        op = ' + ';
        break;
      case 2:
        op = ' - ';
        break;
      case 3:
        op = ' * ';
        break;
      default:
        op = ' / ';
        break;
    }
    return parseInt(prompt('Hvað er ' + a + op + b + "?"));
  }

  /**
   * Skilar tölu af handahófi á bilinu [min, max]
   */
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Byrjar leik
  start();
})();