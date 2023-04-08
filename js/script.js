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
    const imageLink = document.createElement('a');
    const links = document.createElement('div');
    const projectLink = document.createElement('a');
    const codeLink = document.createElement('a');

    content.classList.add('content');
    links.classList.add('links');

    title.textContent = project?.title;
    text.textContent = project?.description[0].children[0].text;

    image.src = getImageUrl(project?.mainImage).width(640).url();
    imageLink.classList.add('image-link');
    imageLink.href = project?.url;
    imageLink.target = '_blank';
    imageLink.appendChild(image);

    projectLink.href = project?.url;
    projectLink.target = '_blank';
    projectLink.textContent = 'Launch';

    links.appendChild(projectLink);

    if (project.repository) {
      codeLink.href = project.repository;
      codeLink.target = '_blank';
      codeLink.textContent = 'Code'
      links.appendChild(codeLink);
    }

    content.appendChild(title);
    content.appendChild(text);
    content.appendChild(links);

    listItem.appendChild(imageLink);
    listItem.appendChild(content);
    projectList.appendChild(listItem);
  });
}
