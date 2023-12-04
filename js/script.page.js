import imageUrlBuilder from '@sanity/image-url';
import { client, fetchProjects, fetchProfile } from './sanity';

const profile = await fetchProfile();
const projects = await fetchProjects();
const builder = imageUrlBuilder(client);

const aboutSection = document.querySelector('.about');
const projectSection = document.querySelector('.projects');

const year = new Date().getFullYear();
const copyrightText = document.createTextNode(year);

function getImageUrl(source) {
  return builder.image(source);
}

// Profile
if (profile) {
  if (profile.bio) {
    const bio = document.createTextNode(profile.bio);

    document.querySelector('.about .bio').appendChild(bio);
  }

  if (profile.github) {
    const github = document.createElement('a');

    github.href = profile?.github;
    github.target = '_blank';
    github.textContent = profile.github_user || 'Profile';

    document.querySelector('#footer .social .github').appendChild(github);
  }

  if (profile.linkedin) {
    const linkedin = document.createElement('a');

    linkedin.href = profile.linkedin;
    linkedin.target = '_blank';
    linkedin.textContent = profile.linkedin_user || 'Profile';


    document.querySelector('#footer .social .linkedin').appendChild(linkedin);
  }

  if (profile.website) {
    const website = document.createElement('a');

    website.href = profile.website;
    website.target = '_blank';
    website.textContent = profile.website_name || 'Website';

    document.querySelector('#footer .social .website').appendChild(website);
  }

  aboutSection.classList.remove('hidden');
}

// Projects
if (projects.length) {
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
    content.classList.add('mobile-padding');
    links.classList.add('links');

    title.textContent = project?.title;

    text.textContent = project?.intro;

    image.src = getImageUrl(project?.mainImage).size(400,400).url();
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
      codeLink.textContent = 'Code';
      links.appendChild(codeLink);
    }

    content.appendChild(title);
    content.appendChild(text);
    content.appendChild(links);

    listItem.appendChild(imageLink);
    listItem.appendChild(content);
    document.querySelector('.projects ul').appendChild(listItem);
  });

  projectSection.classList.remove('hidden');
}

document.querySelector('.copyright').appendChild(copyrightText);