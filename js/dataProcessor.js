const jsonDataFile = "data.json";
const hiddenItemsCls = "u-hidden";
const categoriesCardsContCls = "js-data";

const showHiddenItems = () => {
  const hiddenElements = Array.from(
    document.getElementsByClassName(hiddenItemsCls),
  );
  if (!hiddenElements || hiddenElements.length === 0) {
    throw new Error("hiddenElements is empty or missing!");
  }
  hiddenElements.forEach((el) => el.classList.remove(hiddenItemsCls));
};

const generateSummaryCards = (data = []) => {
  if (!data || data.length === 0) return false;
  const usedCssClasses = [
    "summary-card",
    "summary-card__item",
    "summary-card__icon",
    "summary-card__category",
    "summary-card__score-points",
    "summary-card__separator",
    "summary-card__max-points",
  ];
  const [
    cardContCls,
    cardItemCls,
    iconCls,
    categoryCls,
    scorePointsCls,
    separatorCls,
    maxPointsCls,
  ] = usedCssClasses;

  const cards = [];

  data.forEach((cardData) => {
    const topContainer = document.createElement("div");
    topContainer.classList.add(cardContCls); //summary-card container
    const itemContainer = document.createElement("div");
    itemContainer.classList.add(cardItemCls); //ummary-card__item
    const categoryLabel = cardData.category?.toLowerCase();
    const itemContainerCategoryCls = cardItemCls + "--" + categoryLabel;
    itemContainer.classList.add(itemContainerCategoryCls);

    const iconImg = document.createElement("img");
    iconImg.classList.add(iconCls);
    iconImg.classList.add(iconCls + "--" + categoryLabel);
    iconImg.setAttribute("src", cardData.icon);
    iconImg.setAttribute("alt", cardData.category + " image");

    itemContainer.appendChild(iconImg);

    const categoryCont = document.createElement("div");
    categoryCont.classList.add(categoryCls);
    categoryCont.classList.add(categoryCls + "--" + categoryLabel);
    categoryCont.innerText = cardData?.category;

    itemContainer.appendChild(categoryCont);

    const scorePointsCont = document.createElement("div");
    scorePointsCont.classList.add(scorePointsCls);
    scorePointsCont.innerText = cardData.score;

    itemContainer.appendChild(scorePointsCont);

    const separatorCont = document.createElement("div");
    separatorCont.classList.add(separatorCls);
    separatorCont.innerText = "/";

    itemContainer.appendChild(separatorCont);

    const maxPointsCont = document.createElement("div");
    maxPointsCont.classList.add(maxPointsCls);
    maxPointsCont.innerText = 100;

    itemContainer.appendChild(maxPointsCont);
    topContainer.appendChild(itemContainer);

    cards.push(topContainer);
  });

  return cards;
};

const addSummaryCardsToDOM = (cards = []) => {
  if (!cards || cards.length === 0) {
    throw new Error("The cards array is invalid");
  }
  const container = document.getElementById(categoriesCardsContCls);
  cards.forEach((card) => container.appendChild(card));
};

export const readData = async () => {
  try {
    const response = await fetch(`js/${jsonDataFile}`);
    if (!response.ok) {
      console.log(1);
      showHiddenItems();
      return;
    }
    const data = await response.json();
    const summaryCards = generateSummaryCards(data);
    if (!summaryCards) {
      showHiddenItems();
      return;
    }
    addSummaryCardsToDOM(summaryCards);
  } catch (e) {
    e.message;
  }
};
