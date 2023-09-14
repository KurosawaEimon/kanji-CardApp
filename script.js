const start_button = document.getElementById("start");
const stop_button = document.getElementById("stop");
const reveal_button = document.getElementById("reveal");
const correct_button = document.getElementById("correct");
const wrong_button = document.getElementById("wrong");
const cardtype_button = document.getElementById("card-type");
const repeats_button = document.getElementById("repeats");

let num_correct = 0;
let num_wrong = 0;
let num_total = 0;

let flash_card_list;

let current_flash_card_index = -1;

//algo for shuffling arrays.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//function to create list of kanji to iterate through.
function initialize_list() {
  const randomized_cards = shuffleArray(flash_cards);
  const num_repeats = Number(document.getElementById("repeats").value);

  const repeat = (arr, n) => [].concat(...Array(n).fill(arr));

  flash_card_list = repeat(randomized_cards, num_repeats);
}

//clear_flash_cards empties the contents of the kanji cards.
function clear_flash_cards() {
  const card_q_window = document.getElementById("flash-card-q");
  const card_ans_window = document.getElementById("flash-card-ans");

  card_q_window.innerHTML = "";
  card_ans_window.innerHTML = "";
}

//next clears the kanji card window and appends the next kanji card.
function next() {
  clear_flash_cards();

  current_flash_card_index += 1;
  if (current_flash_card_index == flash_card_list.length) {
    stop();
  } else {
    correct_button.disabled = true;
    wrong_button.disabled = true;
    reveal_button.disabled = false;

    correct_button.classList.add("disabled");
    wrong_button.classList.add("disabled");
    reveal_button.classList.remove("disabled");

    let card_type = document.getElementById("card-types").value;

    const current_card_q = document.createElement("img");
    const card_ans = document.createElement("img");

    //append kanji card ans and question according to "card-type".
    if (card_type == "kanji-to-kana") {
      let flash_card_img = flash_card_list[current_flash_card_index].kanji;
      let card_ans_img = flash_card_list[current_flash_card_index].kana;
      current_card_q.setAttribute("src", flash_card_img);
      card_ans.setAttribute("src", card_ans_img);
      card_ans.setAttribute("id", "ans");
      card_ans.hidden = "true";
    } else if (card_type == "kana-to-kanji") {
      let flash_card_img = flash_card_list[current_flash_card_index].kana;
      let card_ans_img = flash_card_list[current_flash_card_index].kanji;
      current_card_q.setAttribute("src", flash_card_img);
      card_ans.setAttribute("src", card_ans_img);
      card_ans.hidden = "true";
      card_ans.setAttribute("id", "ans");
    }

    const card_q_window = document.getElementById("flash-card-q");
    const card_ans_window = document.getElementById("flash-card-ans");

    card_q_window.appendChild(current_card_q);
    card_ans_window.appendChild(card_ans);
  }
}

//start begins kanji card program
function start() {
  clear_flash_cards();

  stop_button.disabled = false;
  start_button.disabled = true;

  stop_button.classList.remove("disabled");
  start_button.classList.add("disabled");

  num_correct = 0;
  num_wrong = 0;
  num_total = 0;

  update_counters();

  initialize_list();

  next();
}

//stop terminates the program
function stop() {
  reveal_button.disabled = true;
  stop_button.disabled = true;
  correct_button.disabled = true;
  wrong_button.disabled = true;
  start_button.disabled = false;

  reveal_button.classList.add("disabled");
  stop_button.classList.add("disabled");
  correct_button.classList.add("disabled");
  wrong_button.classList.add("disabled");
  start_button.classList.remove("disabled");

  clear_flash_cards();

  current_flash_card_index = -1;

  if (num_total > 0) {
    const score = Math.floor((num_correct / num_total) * 100);
    score_window = document.getElementById("flash-card-q");
    score_marker = document.createElement("h2");
    score_marker.textContent = "Total Score: " + score + "%";
    score_window.appendChild(score_marker);
  }
}

//reveal sets the kanji card answer to hidden=false
function reveal() {
  correct_button.disabled = false;
  wrong_button.disabled = false;
  reveal_button.disabled = true;

  correct_button.classList.remove("disabled");
  wrong_button.classList.remove("disabled");
  reveal_button.classList.add("disabled");

  let card_ans = document.getElementById("ans");

  card_ans.hidden = false;
}

function update_counters() {
  total_counter = document.getElementById("total-counter");
  correct_counter = document.getElementById("correct-counter");
  wrong_counter = document.getElementById("wrong-counter");

  total_counter.textContent = num_total;
  correct_counter.textContent = num_correct;
  wrong_counter.textContent = num_wrong;
}

//correct updates the score and proceeds to next kanji card
function correct() {
  num_correct += 1;
  num_total += 1;

  update_counters();

  next();
}

//correct updates the score and proceeds to next kanji card
function wrong() {
  num_wrong += 1;
  num_total += 1;

  update_counters();

  next();
}

const flash_cards = [
  { kanji: "./ageru.png", kana: "./ageru(kana).png" },
  { kanji: "./aka.png", kana: "./aka(kana).png" },
  { kanji: "./akeru.png", kana: "./akeru(kana).png" },
  { kanji: "./aki.png", kana: "./aki(kana).png" },
  { kanji: "./aru.png", kana: "./aru(kana).png" },
  { kanji: "./aruku.png", kana: "./aruku(kana).png" },
  { kanji: "./asa.png", kana: "./asa(kana).png" },
  { kanji: "./ashi.png", kana: "./ashi(kana).png" },
  { kanji: "./atarashii.png", kana: "./atarashii(kana).png" },
  { kanji: "./atatakai.png", kana: "./atatakai(kana).png" },
  { kanji: "./ato.png", kana: "./ato(kana).png" },
  { kanji: "./atsui(temp).png", kana: "./atsui(temp)(kana).png" },
  { kanji: "./atsui.png", kana: "./atsui(kana).png" },
  { kanji: "./au.png", kana: "./au(kana).png" },
  { kanji: "./baai.png", kana: "./baai(kana).png" },
  { kanji: "./ban.png", kana: "./ban(kana).png" },
  { kanji: "./benkyou.png", kana: "./benkyou(kana).png" },
  { kanji: "./chiisai.png", kana: "./chiisai(kana).png" },
  { kanji: "./chikai.png", kana: "./chikai(kana).png" },
  { kanji: "./daigaku.png", kana: "./daigaku(kana).png" },
  { kanji: "./daisuki.png", kana: "./daisuki(kana).png" },
  { kanji: "./deru.png", kana: "./deru(kana).png" },
  { kanji: "./eki.png", kana: "./eki(kana).png" },
  { kanji: "./furui.png", kana: "./furui(kana).png" },
  { kanji: "./futsuka.png", kana: "./futsuka(kana).png" },
  { kanji: "./fuyu.png", kana: "./fuyu(kana).png" },
  { kanji: "./gakkou.png", kana: "./gakkou(kana).png" },
  { kanji: "./gakusei.png", kana: "./gakusei(kana).png" },
  { kanji: "./genki.png", kana: "./genki(kana).png" },
  { kanji: "./go.png", kana: "./go(kana).png" },
  { kanji: "./gogo.png", kana: "./gogo(kana).png" },
  { kanji: "./gohan.png", kana: "./gohan(kana).png" },
  { kanji: "./gozen.png", kana: "./gozen(kana).png" },
  { kanji: "./hachi.png", kana: "./hachi(kana).png" },
  { kanji: "./hanasu.png", kana: "./hanasu(kana).png" },
  { kanji: "./hareru.png", kana: "./hareru(kana).png" },
  { kanji: "./haru.png", kana: "./haru(kana).png" },
  { kanji: "./hashiru.png", kana: "./hashiru(kana).png" },
  { kanji: "./hatsuka.png", kana: "./hatsuka(kana).png" },
  { kanji: "./heya.png", kana: "./heya(kana).png" },
  { kanji: "./hidari.png", kana: "./hidari(kana).png" },
  { kanji: "./hikui.png", kana: "./hikui(kana).png" },
  { kanji: "./hiraku.png", kana: "./hiraku(kana).png" },
  { kanji: "./hiroi.png", kana: "./hiroi(kana).png" },
  { kanji: "./hiru.png", kana: "./hiru(kana).png" },
];
