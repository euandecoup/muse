# Muse: Virtual Exhibition Curator

Muse is a web application that allows users to create personalized virtual art exhibitions by curating artworks from multiple prestigious museums including the Harvard Art Museums, Rijksmuseum, and Metropolitan Museum of Art. Users can search through vast collections, save their favorite pieces, and create custom exhibitions.

## Features

- Search across multiple museum APIs simultaneously
- View detailed artwork information including artist, date, culture, and medium
- Create personalized virtual exhibitions
- User authentication with both traditional signup and guest access
- Responsive design for desktop and mobile viewing
- Accessibility-focused implementation

## Prerequisites

Before you begin, ensure you have:

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

This will create an optimized build in the `build` folder.

## Project Structure

```
src/
├── components/          # React components
│   ├── ArtworkDetails/ # Detailed artwork view
│   ├── ArtworkList/    # Grid view of artwork results
│   ├── Exhibition/     # Exhibition management
│   ├── Login/          # User authentication
│   └── SearchForm/     # Search interface
├── contexts/           # React contexts
├── services/          # API integration services
├── types/             # TypeScript type definitions
└── styles/           # CSS modules
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

## Development Notes

- The application uses TypeScript for type safety
- CSS Modules are used for styling to prevent class name conflicts
- React Router is used for client-side routing
- Firebase is used for authentication and data persistence

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Harvard Art Museums API
- Rijksmuseum API
- Metropolitan Museum of Art API
- Firebase
- React and the Create React App team

## Support

For support, please open an issue in the GitHub repository or contact the maintainers directly.
