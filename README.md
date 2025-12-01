# Kids Math App

An interactive math learning application designed for children of different age groups. The app provides age-appropriate math problems with a fun, engaging interface.

Original design available at [Figma](https://www.figma.com/design/4iywRvtmrZaDeswdXFx65M/Kids-Math-App).

## Features

- **Age-appropriate levels**: Three difficulty levels for ages 2-4, 4-8, and 8+
- **Interactive problems**: Addition, subtraction, multiplication, and division
- **Visual feedback**: Encouraging messages and animations
- **Score tracking**: Track progress with stars earned and accuracy percentage
- **Streak system**: Celebrate consecutive correct answers
- **Responsive design**: Works seamlessly on mobile and desktop devices
- **Beautiful UI**: Modern gradient design with smooth animations

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Motion** for animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kids-math
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000` (or the next available port).

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `build/` directory.

## Project Structure

```
kids-math/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── ...           # Feature components
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Usage

1. **Select a Level**: Choose an age-appropriate difficulty level
2. **Solve Problems**: Enter your answer and click "Check"
3. **Track Progress**: View your score, accuracy, and current streak
4. **Change Level**: Use the back arrow to return to level selection
5. **Reset**: Use the reset button to start over

## Development

The project uses:
- **Vite** for fast HMR (Hot Module Replacement)
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling

## License

This project is private and proprietary.

## Contributing

This is a private project. For questions or issues, please contact the repository owner.
