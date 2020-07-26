# vue-user-application-quick-start

A Single Page Application scaffolding built with Vue.js that can be used as an initial
starting point for rapid prototyping.

---
## Getting Started

### Background
The core functionality of user applications are largely the same regardless of the
application's broader value proposition.  User applications always require:
- Menu Navigation
- Loading Spinners
- Alert Prompts
- Authentication Management
    - Login Form
    - Forgot Password Form
    - Forgot Username/Email Form
    - Reset Password Form
- Authentication Protected Views/Routes
- Data Persistence across Views/Routes and Components

Additionally, browser-based user applications tend to have the same layout elements in
their scaffolding.  These elements include:
- A header bar
- A menu whether pinned or slider enabled
- Scrollable content areas

What tends to vary between User Applications is the placement and the styles applied
to these elements thereby giving the application a unique look and feel that sets it apart.

This quick start scaffolding provides base user application functionality as well as many
key configuration settings that allow for the customization of the layout and styles.

### Under the Hood
This quick start scaffolding leverages the following packages beyond core Vue to deliver
a starting point for rapid production-grade prototyping:
- BootstrapVue for UI Framework & Components
- Vue-Router for Route Navigation
- Vuex for Data State Management
- Vuelidate for Form Validation
- SweetAlerts2 for Alerts and Prompts

### Get Up and Running... Quickly!

1. Fork this repository and clone it to your local machine
2. Create a new directory named `ui-custom` in the `src` directory
3. Copy the contents of the `src/ui-base/utilities/templates/uiCustom`
4. Paste these contents into the `src/ui-custom` directory you just created
5. Copy the contents of the `src/ui-base/utilities/templates/appMain`
6. Past these contents into the `src` directory
7. Install application's dependencies: `npm install`
8. Serve up the application with hot reload at localhost:8080: `npm run dev`

### Build for Prototype Production

```
npm run build
```
