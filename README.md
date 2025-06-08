# Digital Escape Room - Mathematical Puzzle Game

A sophisticated Next.js web application featuring 5 challenging levels of mathematical puzzles involving systems of equations and inequalities. Test your problem-solving skills in this immersive escape room experience!

## 🎮 Game Features

- **5 Progressive Levels**: Each level increases in complexity and mathematical sophistication
- **Interactive UI**: Beautiful, animated interface built with Framer Motion
- **Scoring System**: Earn points based on accuracy and speed
- **Hint System**: Get mathematical hints when you're stuck
- **Lives System**: Limited attempts to maintain challenge
- **Real-time Verification**: See your equations validated in real-time

## 📚 Mathematical Concepts Covered

### Level 1: The Laboratory
- **Concept**: Simple system of linear equations (2 variables)
- **Example**: 2x + 3y = 16, x - y = 1
- **Difficulty**: Easy

### Level 2: The Ancient Library  
- **Concept**: System of linear equations (3 variables)
- **Example**: Three equations with three unknowns
- **Difficulty**: Medium

### Level 3: The Stellar Observatory
- **Concept**: System of inequalities and boundary conditions
- **Example**: Linear constraints with feasible region analysis
- **Difficulty**: Hard

### Level 4: The Master's Vault
- **Concept**: Nonlinear system (quadratic + linear)
- **Example**: x² + y² = 25, x + y = 7
- **Difficulty**: Expert

### Level 5: The Final Chamber
- **Concept**: Matrix systems and elimination methods
- **Example**: 3x3 matrix coefficient system
- **Difficulty**: Master

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Math Processing**: Built-in JavaScript Math functions

## 🎯 Game Mechanics

### Scoring System
- **Base Score**: Each level has a base point value (1000-3000 points)
- **Time Bonus**: Faster solutions earn additional points
- **Attempt Penalty**: Multiple attempts reduce your score

### Lives & Hints
- Start with 3 lives and 3 hints
- Lose a life after 3 incorrect attempts on any level
- Earn bonus hints every 2 levels completed
- Game over if you lose all lives

### Difficulty Progression
Each level introduces new mathematical concepts:
1. **Linear Systems**: Basic substitution and elimination
2. **Multi-variable Systems**: Advanced elimination techniques  
3. **Inequalities**: Boundary analysis and feasible regions
4. **Nonlinear Systems**: Substitution with quadratic equations
5. **Matrix Systems**: Advanced linear algebra concepts

## 🎨 Design Philosophy

The game combines educational mathematics with engaging game design:

- **Thematic Rooms**: Each level has a unique theme and storyline
- **Visual Feedback**: Real-time equation verification and animated responses
- **Progressive Difficulty**: Concepts build upon each other naturally
- **Encouraging Interface**: Positive reinforcement and helpful hints

## 🔧 Development

### Project Structure
```
app/
├── components/
│   ├── GameContext.tsx       # Game state management
│   ├── GameComplete.tsx      # Victory screen
│   └── levels/              # Individual level components
│       ├── LevelOne.tsx
│       ├── LevelTwo.tsx
│       ├── LevelThree.tsx
│       ├── LevelFour.tsx
│       └── LevelFive.tsx
├── globals.css              # Global styles and Tailwind
├── layout.tsx              # Root layout
└── page.tsx               # Main game component
```

### Key Features Implementation
- **State Management**: React Context API for global game state
- **Animations**: Framer Motion for smooth transitions and feedback
- **Responsive Design**: Tailwind CSS for mobile-friendly layouts
- **Type Safety**: Full TypeScript implementation

## 🎯 Educational Value

This game teaches:
- **Linear Algebra**: Systems of equations and matrix operations
- **Analytical Thinking**: Breaking down complex problems
- **Mathematical Reasoning**: Understanding relationships between variables
- **Problem-Solving Skills**: Multiple approaches to mathematical challenges

## 🤝 Contributing

Feel free to contribute by:
- Adding new levels or mathematical concepts
- Improving the UI/UX design
- Enhancing the scoring system
- Adding new game mechanics

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy solving mathematical puzzles and escaping the digital rooms!** 🧮✨ 