import imageUrlBuilder from '@sanity/image-url';
import { client, getFeaturedProjects } from './sanity';

const projects = await getFeaturedProjects();
const builder = imageUrlBuilder(client);

const projectSection = document.querySelector('.projects');
const projectList = document.querySelector('.projects ul');

function getImageUrl(source) {
  return builder.image(source);
}

// Projects
if (projects.length) {
  projectSection.classList.remove('hidden');

  projects.forEach((project) => {
    const listItem = document.createElement('li');
    const content = document.createElement('div');
    const title = document.createElement('h3');
    const text = document.createElement('p');
    const image = document.createElement('img');
    const projectLink = document.createElement('a');
    const codeLink = document.createElement('a');

    content.classList.add('content');
    title.textContent = project?.title;
    text.textContent = project?.description[0].children[0].text;
    image.src = getImageUrl(project?.mainImage).width(200).url();
    projectLink.href = project?.url;
    projectLink.target = '_blank';
    projectLink.textContent = project?.title;

    content.appendChild(title);
    content.appendChild(text);
    content.appendChild(projectLink);
    if (project.repository) {
      codeLink.href = project.repository;
      codeLink.textContent = 'Code'
      content.appendChild(codeLink);
    }
    listItem.appendChild(image);
    listItem.appendChild(content);
    projectList.appendChild(listItem);
  });
}
