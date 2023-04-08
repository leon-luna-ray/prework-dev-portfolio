import imageUrlBuilder from '@sanity/image-url';
import { client, getProjects } from './sanity';

const projects = await getProjects();
const builder = imageUrlBuilder(client);

const projectList = document.querySelector('.projects ul')

function getImageUrl(source) {
  return builder.image(source);
}

if (projects.length) {
  projects.forEach((project) => {
    console.log(project);
    let listItem = document.createElement('li');
    let content = document.createElement('div');
    let title = document.createElement('h3');
    // todo: Handle richtext
    // let text = document.createElement('p');
    let image = document.createElement('img');


    title.textContent = project?.title;
    image.src = getImageUrl(project.mainImage).width(200).url();
    content.classList.add('content');

    content.appendChild(title);
    listItem.appendChild(image);
    listItem.appendChild(content);
    projectList.appendChild(listItem);
  });
}

// let QUERY = encodeURIComponent('*[_type == "project"]');

// // Compose the URL for your project's endpoint and add the query
// let PROJECTS_URL = `https://${import.meta.env.VITE_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${import.meta.env.VITE_SANITY_DATASET}?query=${QUERY}`;

// fetch(PROJECTS_URL)
//   .then((res) => res.json())
//   .then(({ result }) => {
//     let list = document.querySelector('.projects ul');
//     let firstListItem = document.querySelector('ul li');

//     if (result.length > 0) {
//       console.log(result)
//       list.removeChild(firstListItem);

//       result.forEach((project) => {
//         let listItem = document.createElement('li');
//         let image = document.createElement('img');

//         image.src =

//         // add the project name as the text content
//         listItem.textContent = project?.title;

//         // add the item to the list
//         list.appendChild(listItem);
//       });
//       // let pre = document.querySelector('pre');
//       // add the raw data to the preformatted element
//       // pre.textContent = JSON.stringify(result, null, 2);
//     }
//   })
//   .catch((err) => console.error(err));
