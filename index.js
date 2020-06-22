//import { init } from "dc-extensions-sdk";

let sdk;
let url;

initialize = async () => {
  //sdk = await init();

  url = "https://www.missguided.co.uk/membrane/category/getdata";
  //sdk.params.url;
};
initialize();

let categoryData;

let defaultOption = document.createElement("option");
defaultOption.text = "--- Choose a category ---";

let rootCategoryDropdown = document.getElementById("categories");
rootCategoryDropdown.length = 0;

let subCategoryDropdown = document.getElementById("subs");
subCategoryDropdown.length = 0;

getResults = async (url) => {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const result = await axios(`${proxy}${url}`);
  categoryData = result.data.CategoryGetData.Categories;
  const rootCategory = categoryData.filter(
    (category) => category.ParentID === "2"
  );
  populateDropdown(rootCategory, rootCategoryDropdown);
};

getSubCategories = () => {
  let element = document.getElementById("categories");
  let selectedCategoryID = element.options[element.selectedIndex].value;
  let subCategories = categoryData.filter(
    (category) => category.ParentID === selectedCategoryID
  );
  populateDropdown(subCategories, subCategoryDropdown);
};

populateDropdown = (categories, dropdown) => {
  let option;
  let length = dropdown.options.length;

  // Clear the current dropdown options
  for (let i = length - 1; i >= 0; i--) {
    dropdown.options[i] = null;
  }

  // Create initial option
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  // re populate dropdown with up to date options
  for (let i = 0; i < categories.length; i++) {
    option = document.createElement("option");
    option.text = categories[i].Name;
    option.value = categories[i].ID;
    dropdown.add(option);
  }
};

getSelectedCategory = async () => {
  let element = document.getElementById("subs");
  let selectedCategoryID = element.options[element.selectedIndex].value;
  let selectedCategory = categoryData.filter(
    (category) => category.ID === selectedCategoryID
  );
  //await sdk.field.setValue(selectedCategory[0]);
  console.log(selectedCategory[0]);
};

getResults(url);
