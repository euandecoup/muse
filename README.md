# Muse: Virtual Exhibition Curator

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://muse-d344f.web.app)

Muse is a web application that enables users to create personalised virtual art exhibitions by curating artworks from multiple prestigious museums, including the Harvard Art Museums, Rijksmuseum and Metropolitan Museum of Art. Users can search through vast collections, save their favourite pieces, and create custom exhibitions.

## Live Demo

Visit the live application at: [https://muse-d344f.web.app](https://muse-d344f.web.app)

## Features

- Search across multiple museum APIs simultaneously
- View detailed artwork information including artist, date, culture and medium
- Create personalised virtual exhibitions
- User authentication with both traditional sign-up and guest access
- Responsive design for desktop and mobile viewing
- Accessibility-focussed implementation
- Save and share exhibitions
- Permanent exhibition storage with Firebase

## Prerequisites

Before you begin development, ensure you have:

- Node.js (v14 or higher)
- npm (v6 or higher)
- API keys for:
  - Harvard Art Museums
  - Rijksmuseum
  - Firebase project credentials

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```
REACT_APP_HARVARD_API_KEY=your_harvard_api_key
REACT_APP_RIJKSMUSEUM_API_KEY=your_rijksmuseum_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/muse.git
cd muse
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

To deploy to Firebase:

```bash
firebase deploy
```

## Project Structure

```
src/
├── components/
│   ├── ArtworkDetails/     # Individual artwork view component
│   ├── ArtworkList/        # Grid display of search results
│   ├── Exhibition/         # Exhibition display and management
│   │   └── SaveExhibition/ # Modal for saving exhibitions
│   ├── GuestOption/        # Guest mode access component
│   ├── Login/              # User login form
│   ├── Navigation/         # Main navigation bar
│   ├── Pages/
│   │   ├── ExhibitionEdit/ # Exhibition editing interface
│   │   ├── ExhibitionView/ # Public exhibition view
│   │   ├── GuestHomePage/  # Homepage for guest users
│   │   ├── HomePage/       # Main homepage
│   │   ├── MyExhibitions/  # User's saved exhibitions
│   │   ├── Profile/        # User profile management
│   │   └── Settings/       # Application settings
│   ├── Routes/             # Route protection components
│   ├── SearchForm/         # Search interface
│   └── SignUp/             # User registration form
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── services/
│   ├── exhibitionService.ts # Exhibition data management
│   ├── harvardApi.ts       # Harvard Museums API integration
│   ├── metropolitanApi.ts  # Met Museum API integration
│   └── rijksmuseumApi.ts  # Rijksmuseum API integration
├── types/
│   └── artwork.ts          # TypeScript interfaces
├── firebase.ts             # Firebase configuration
└── App.tsx                 # Main application component
```

## API Integration

Muse integrates with three major museum APIs:

- Harvard Art Museums API
- Rijksmuseum API
- Metropolitan Museum of Art API

Each API has its own service module in `src/services/` handling the specific requirements and data transformations needed.

## Authentication

The application uses Firebase Authentication for user management, supporting:

- Email/password authentication
- Guest access mode
- Protected routes for authenticated users

## Technology Stack

- React with TypeScript
- Firebase Authentication, Hosting and Firestore
- CSS Modules for styling
- React Router for client-side routing
- Lucide React for icons
- Axios for API requests

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

Run the test suite with:

```bash
npm test
```

The project includes unit tests for API services and component tests using Jest and React Testing Library.

## Deployment

The application is deployed on Firebase Hosting. To deploy your own instance:

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Log in to Firebase:

```bash
firebase login
```

3. Initialise Firebase:

```bash
firebase init
```

4. Deploy:

```bash
firebase deploy
```

## Licence

This project is licensed under the MIT Licence - see the LICENCE file for details.

## Acknowledgements

- Harvard Art Museums API
- Rijksmuseum API
- Metropolitan Museum of Art API
- Firebase
- React and the Create React App team

## Support

For support:

- Open an issue in the GitHub repository
- Contact the maintainers
- Visit our live demo at [https://muse-d344f.web.app](https://muse-d344f.web.app)
