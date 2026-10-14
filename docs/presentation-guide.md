# Presenting Loom Interiors

## Prepare before the presentation

1. Install dependencies with `npm ci`.
2. Start the site with `npm run dev` and keep that terminal open.
3. Open the printed localhost URL in Chrome or Edge.
4. Check that the images load. They are bundled locally, so they work without internet once dependencies are installed.
5. Try the camera on the device you will present from. If permission is unavailable, show the sample-image fallback.
6. Use sample contact details. The form never sends them to a business.

For a hosted demonstration, use the public GitHub Pages link in the README. Localhost provides a backup if university Wi-Fi fails. Fonts have system fallbacks.

## Five-minute walkthrough

Start with the problem: an interior-design studio needs a visual website that explains its services and gives visitors a simple way to prepare a consultation request.

Show the hero and navigation. Resize the browser or use mobile emulation to show how the layout adapts. The website uses semantic HTML inside React components, CSS Grid and Flexbox, and media queries.

Open a project from the gallery. The browser's native `dialog` element supplies modal behavior and keyboard focus management. Escape closes it and returns focus to the opening button.

Scroll to "See it in your space". Select Soft mineral, Coastal ink, Cedar quiet, and Garden room. Explain that React state controls the selected palette. Open the camera only if the audience and room setting allow it. The preview stays in the browser and uses `getUserMedia`. Close it to show that the video tracks stop. This is a colour-tint preview, not AR.

Open the chat. Select Kitchen to show a fixed reply. Close the panel, drag the button, and open it again. Pointer Events support mouse and touch. A movement threshold distinguishes dragging from clicking. The chat does not use AI or a network service.

Show the scroll percentage. Explain that a passive scroll listener schedules an update through `requestAnimationFrame` and computes the percentage from scroll position and total scrollable height.

Show the consultation form. Submit it empty, then enter an invalid phone number. Fill the valid sample fields and create a brief. Download the text file. Explain the limitation directly: the frontend validates input and generates a file, but no server receives it.

Finish with what you would add next: a secure backend for enquiries, an admin dashboard, email notifications, and automated accessibility checks.

## Explain the code

`src/main.jsx` mounts React. `App.jsx` loads `Home.jsx`. `Home.jsx` assembles the sections, while each interactive component owns its local state and effect cleanup.

`FitCheck.jsx` stores the selected look and camera state. Refs hold the video element and media stream. A request counter prevents a cancelled permission request from turning the camera back on.

`ChatWidget.jsx` stores visibility, position, and the selected quick reply. Pointer coordinates calculate movement. A ref remembers whether the last gesture was a drag, so its following click cannot open the panel accidentally.

`Contact.jsx` uses browser constraint validation and checks trimmed text. A Blob holds the downloadable text. An object URL lets the browser download it, and the component later revokes that URL.

`projects.js` separates content from rendering. Vite resolves the imported images into hashed build assets. Relative build paths allow deployment under a GitHub Pages repository subpath.

## Likely questions

| Question | Answer |
| --- | --- |
| Why React? | Each section is a component, and local state expresses camera, chat, and form changes. |
| Why Vite? | It runs the development server and builds production JavaScript, CSS, and images. |
| Is the camera augmented reality? | No. It shows live video with a palette tint. It does not understand the room or place furniture. |
| Is the chat AI? | No. It displays fixed replies for the chosen project type. |
| Where does the form save data? | It does not save to a database. It creates a brief that the visitor can download. |
| Why does the camera sometimes fail? | It needs permission, a compatible device, and a secure context such as HTTPS or localhost. |
| How did you test it? | Browser tests cover four viewport widths and the main interactions. Physical-device camera testing remains manual. |
| Did you build everything from scratch? | This version uses the original supplied project, with repairs and documentation added for the demonstration. Explain your own work separately. |

## Keep the project history accurate

This repository is a later preparation of the supplied training project. Do not describe its new fixes or automated tests as work completed during the original internship unless that is supported by your own records. Read the code and replace presentation wording with what you personally implemented and understand.
