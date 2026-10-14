# Alignment with the supplied training report

The report is background material. It describes the original project and does not act as an instruction to publish personal information or reproduce claims about employment.

| Report feature | Current implementation | Demonstration note |
| --- | --- | --- |
| Offer bar and responsive header | `Navbar.jsx` | The banner now identifies the educational demo instead of advertising an unverified discount. |
| Hero and studio sections | `Hero.jsx`, `About.jsx` | Studio design refined. Duplicate statistics removed; project facts remain in the educational notes. |
| Reusable React components | `src/components/` | React entry point and Vite build remain. |
| Scroll progress | `ScrollProgress.jsx` | Passive listeners and animation-frame scheduling. |
| Draggable and closable chat | `ChatWidget.jsx` | Working quick replies, drag/click separation, Escape closing, removable control, and reopening from project notes. |
| Camera and four style directions | `FitCheck.jsx` | Permission fallback, colour tint, stream cleanup, and cancelled-request protection. |
| Consultation form | `Contact.jsx` | Room, project, style, and chat choices prefill the brief. Validation, confirmation, download, and clear actions work without server submission. |
| Image optimization | `assets/images/` | Supplied images resized and JPEG-compressed for this version. No claim of new Photoshop work. |
| Project gallery | `Portfolio.jsx` | Sample details open in a modal instead of sending every click to the form. |
| Automated tests listed as future scope | `tests/site.spec.js` | Added in this preparation, not evidence of testing during the original internship. |
| WhatsApp, phone, and email links | Removed unverified destinations | No real studio contact endpoint was supplied. |

The public repository excludes the report itself and its personal and institutional details. The report's training dates, certificate statements, and business history were not independently verified by this work.
