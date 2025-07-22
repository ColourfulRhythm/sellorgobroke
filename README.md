# City Weavers - Professional CBT Platform

A modern, professional Computer-Based Test (CBT) platform designed specifically for agents and professionals to take assessments, get instant results, and download certificates upon passing.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login and registration system
- **CBT Testing** - Interactive multiple-choice question interface
- **Real-time Timer** - Countdown timer with auto-submission
- **Instant Results** - Immediate scoring and feedback
- **Certificate Generation** - Professional PDF certificates for passing scores
- **Retake System** - Ability to retake failed tests
- **Progress Tracking** - Visual progress indicators and statistics

### User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Beautiful, intuitive interface with smooth animations
- **Question Navigation** - Easy navigation between questions with visual indicators
- **Flag Questions** - Mark questions for review
- **Auto-save** - Answers are automatically saved to prevent data loss
- **Answer Review** - Detailed review of all questions with explanations

### Professional Features
- **Dashboard Analytics** - Comprehensive overview of test performance
- **Performance Breakdown** - Detailed analysis of scores and time efficiency
- **Share Results** - Share achievements on social media
- **Certificate Download** - Professional PDF certificates with unique IDs
- **Test History** - Track all previous attempts and scores

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Forms**: React Hook Form with validation
- **PDF Generation**: jsPDF with html2canvas
- **Icons**: Lucide React
- **State Management**: React hooks and localStorage

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd proseller-cbt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
proseller-cbt/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── test/             # Test-taking pages
│   │   ├── [id]/         # Individual test page
│   │   └── [id]/results/ # Test results page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable components
│   ├── LoginForm.tsx     # Login form component
│   └── RegisterForm.tsx  # Registration form component
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # Project documentation
```

## 🎯 Usage Guide

### For Test Takers

1. **Registration/Login**
   - Visit the homepage and create an account or log in
   - Provide your agent ID and professional details

2. **Dashboard**
   - View available tests and your progress
   - See statistics and performance metrics
   - Access previous test results

3. **Taking a Test**
   - Click "Start Test" on any available assessment
   - Navigate through questions using the sidebar
   - Flag questions for review if needed
   - Monitor your time with the countdown timer
   - Submit when ready or when time expires

4. **Results & Certificates**
   - View instant results with detailed breakdown
   - Review all answers with explanations
   - Download professional certificate (if passed)
   - Share results on social media
   - Retake test if needed

### Test Features

- **Question Types**: Multiple choice with 4 options
- **Timer**: Configurable time limits with auto-submission
- **Navigation**: Jump to any question using the sidebar
- **Progress Tracking**: Visual indicators for answered/unanswered questions
- **Auto-save**: Answers saved automatically to prevent loss
- **Flagging**: Mark questions for later review

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - Main brand color
- **Success**: Green (#22C55E) - Passed tests, correct answers
- **Danger**: Red (#EF4444) - Failed tests, incorrect answers
- **Warning**: Orange (#F97316) - Flagged questions, time warnings

### Components
- **Cards**: Clean, elevated containers with shadows
- **Buttons**: Consistent styling with hover states
- **Forms**: Accessible input fields with validation
- **Progress Bars**: Visual progress indicators
- **Modals**: Overlay dialogs for confirmations

## 🔧 Configuration

### Adding New Tests
1. Create test data in the test components
2. Add questions with correct answers and explanations
3. Set passing score and time limit
4. Update the dashboard mock data

### Customizing Certificates
1. Modify the certificate template in the results page
2. Update styling and layout as needed
3. Add company branding and logos
4. Customize certificate fields and format

### Styling Customization
1. Edit `tailwind.config.js` for theme changes
2. Modify `app/globals.css` for custom styles
3. Update component-specific styles as needed

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file for environment-specific configurations:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_NAME=ProSeller
```

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layout with touch-friendly controls
- **Mobile**: Streamlined interface for smaller screens

## 🔒 Security Features

- Form validation and sanitization
- Secure password requirements
- Session management
- Data persistence with localStorage
- Input validation and error handling

## 🎯 Future Enhancements

- **Backend Integration**: Connect to a real API
- **Database**: Store user data and test results
- **Admin Panel**: Manage tests and users
- **Analytics**: Advanced reporting and insights
- **Multi-language Support**: Internationalization
- **Advanced Question Types**: Essay, file upload, etc.
- **Real-time Collaboration**: Live proctoring features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**ProSeller** - Empowering professionals through certification and assessment. 

## 1. **Create a List of Tests**

Instead of a single `mockTest`, define an array or object of tests:

```ts
export const tests: Test[] = [
  {
    id: '1',
    title: 'Real Estate Agent Competency Quiz',
    passingScore: 70,
    questions: [ /* ...existing questions... */ ]
  },
  {
    id: '2',
    title: 'Property Law Basics',
    passingScore: 75,
    questions: [ /* ...questions for test 2... */ ]
  },
  // Add up to 5 tests
]
```

## 2. **Load the Correct Test by ID**

In both `app/test/[id]/page.tsx` and `app/test/[id]/results/page.tsx`, import the tests and select the correct one:

```ts
import { tests } from './testData';

const test = tests.find(t => t.id === params.id);
if (!test) {
  // handle test not found (redirect or show error)
}
```
Replace all `mockTest` references with `test`.

## 3. **Update the Dashboard/Test List**

On your dashboard (e.g., `app/dashboard/page.tsx`), list all tests:

```tsx
import { tests } from '../test/[id]/testData';

{tests.map(test => (
  <div key={test.id}>
    <h3>{test.title}</h3>
    <button onClick={() => router.push(`/test/${test.id}`)}>Start Test</button>
  </div>
))}
```

## 4. **Summary of Steps**

- Move your test data to a shared file (e.g., `testData.ts`).
- Refactor test-taking and results pages to use the selected test from the list.
- Update your dashboard to show all available tests. # sellorgobroke
