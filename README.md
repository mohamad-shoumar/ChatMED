<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> A web app designed to revolutionize primary healthcare by leveraging the power of ChatGPT.
>
> Our mission is to make quality healthcare accessible to everyone while empowering individuals to stay on top of their health goals. By combining advanced technology with personalized care, ChatMED aims to bridge the gap between patients and healthcare providers.

### Patient Stories

- As a patient, I want to choose a doctor and enter my symptoms to a chatbot so that the doctor can check my symptoms later.
- As a Patient, I want to customize my order, so I can add or remove ingredients according to my preferences.
- As a patient, I want to input my vitals and receive notifications assessing my progress so that I can stay on track with my health goals.

### Doctor Stories

- As a doctor, I want to receive a diagnosis and treatment plan from ChatGPT so that I can provide medical advice to my patient.
- As a doctor, I want to conduct virtual consultations through live chat with the patient if needed.
- As a doctor, I want to view my patients along their vitals and detailed medical history.

<br><br>

<!-- Prototyping -->
<img src="./readme/title3.svg"/>

> We designed ChatMED using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

### Mockups

> | Landing                                      | Signup/Signin/Profile                                                                                        |
> | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
> | <img src="./readme/demo/Landingpage.png"  /> | <img src="./readme/demo/figmasignup.png" height='20%' width='100%' /> ![Profile](./readme//demo/Profile.jpg) |

> |     | View Patient                                 | Live Chat                         |
> | --- | -------------------------------------------- | --------------------------------- |
> |     | ![fsdaf](./readme/demo/ViewPatientFigma.png) | ![fsdaf](./readme/demo/Chats.jpg) |

> <br><br>

<!-- Implementation -->
<img src="./readme/title4.svg"/>

> Using the mockups as a guide, we implemented ChatMED app with the following features:

### Shared Screens

> | Landing                                                 |
> | ------------------------------------------------------- |
> | <img src="./readme/gifs/landing2gif.gif" width="100%"/> |

> | Auth                                             |
> | ------------------------------------------------ |
> | <img src="./readme/gifs/Auth.gif" width="100%"/> |

> | Live Chat                                        |
> | ------------------------------------------------ |
> | <img src="./readme/gifs/chat.gif" width="100%"/> |

> | Multi Language and Responsiveness                    |
> | ---------------------------------------------------- |
> | <img src="./readme/gifs/multlang.gif" width="100%"/> |

### Patient Screens

> | Dashbaord                                                    |
> | ------------------------------------------------------------ |
> | <img src="./readme/gifs/dahsboardPatient.gif" width="100%"/> |

> | Vitals                                             |
> | -------------------------------------------------- |
> | <img src="./readme/gifs/vitals.gif" width="100%"/> |

> | Medical History                                            |
> | ---------------------------------------------------------- |
> | <img src="./readme/gifs/medicalHistory.gif" width="100%"/> |

> | Consultation                                        |
> | --------------------------------------------------- |
> | <img src="./readme/gifs/consult.gif" width="100%"/> |

### Doctro Screens

> | Edit Response                                            |
> | -------------------------------------------------------- |
> | <img src="./readme/gifs/editResponse.gif" width="100%"/> |

> | View Patient                                            |
> | ------------------------------------------------------- |
> | <img src="./readme/demo/ViewPatient.png" width="100%"/> |

> | Edit Profile                                               |
> | ---------------------------------------------------------- |
> | <img src="./readme/gifs/docprofileEdit.gif" width="100%"/> |

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg"/>

### ChatMED is built using the following technologies:

-The application utilizes OpenAI's API, which offers advanced natural language processing capabilities, to generate personalized treatment plans, analyze vital information, and provide customized advice.

- For unit testing, this project uses [jest](https://jestjs.io/) which is a JavaScript testing framework that supports Typescript.
- This project uses the [React JS development framework](https://reactjs.org/). React is a declarative, efficient, and flexible JavaScript library for building SPA (single web application) and user interfaces or UI components. It lets you compose complex UIs from small and isolated pieces of code called “components”.
- For styling i used [SCSS Modules](https://sass-lang.com/) along [Primeract](https://primereact.org/) which provided a flexible design pattern.
- For live messages, the project uses the [Firebase](https://firebase.google.com/).
- The project uses the font ["Montserrat"](https://fonts.google.com/specimen/Montserrat) as its main font, and the design of the app adheres to the material design guidelines.
- For persistent storage (database), this project uses the [MongoDB](https://www.mongodb.com/) package which allows the app to create a custom storage schema and save it to a local database.
- This project uses [Node.js](https://nodejs.org/) a JavaScript runtime built on Chrome's V8 JavaScript engine as a backend infrastructure and [Express](https://expressjs.com/) framework which is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

<br><br>

<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up ChatMED locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/MoeShoumar/ChatMED
   ```
   Here you will find three folders (frontend, backend, and test)
2. Inside the frontend folder, run:

   ```sh
   npm install
   ```

3. Inside the backend folder, run:
   ```sh
   npm install
   ```
4. Set your `DB_CONNECT` to your MongoDB connection URL and add your `TOKEN_SECRET`.

5. Set up Firebase:

Create a new project on the Firebase console (https://console.firebase.google.com).
Set up Firebase Authentication:
Enable the email/password authentication method.

6. Configure the frontend to use Firebase:

Inside the frontend folder, create a new file named .env.local.
Add the following lines to the .env.local file::

```sh
REACT_APP_FIREBASE_API_KEY=<your_firebase_apiKey>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_authDomain>
REACT_APP_FIREBASE_PROJECT_ID=<your_firebase_projectId>
REACT_APP_FIREBASE_DATABASE_URL=<your_firebase_databaseURL>
```
