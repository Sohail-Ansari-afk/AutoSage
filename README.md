# AutoSage: The Vehicle Expert

<div align="center">

![AutoSage Logo](https://img.shields.io/badge/AutoSage-Vehicle%20Expert-cyan)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)
![Google Gemini](https://img.shields.io/badge/Gemini-AI-green)

</div>

AutoSage is an AI-powered vehicle expert application that provides comprehensive information about cars, motorcycles, and other vehicles. Powered by Google's Gemini AI models, it offers detailed specifications, comparisons, maintenance tips, and generates photorealistic images of vehicles.
<img width="1614" height="982" alt="Screenshot 2025-07-21 172330" src="https://github.com/user-attachments/assets/ab48b913-6d67-4e58-889b-2ffb933fbc1e" />
## 🚀 Features

- **Expert Vehicle Information**: Get detailed specifications, insightful reviews, fair comparisons, and practical maintenance advice.
- **AI-Generated Vehicle Images**: View high-quality, photorealistic images of vehicles generated based on your query.
- **Source Citations**: Access the original sources of information for further reading.
- **Pre-defined Scenarios**: Choose from example scenarios to quickly get information on common vehicle-related topics.
- **Responsive Design**: Enjoy a seamless experience across desktop and mobile devices.

## 📋 Example Use Cases

- Compare different vehicle models with detailed specifications and features
- Get seasonal maintenance tips for your vehicle
- Find eco-friendly vehicle options with range, charging time, and price comparisons
- Research specific vehicle models with detailed information and images

<img width="1546" height="966" alt="Screenshot 2025-07-21 172641" src="https://github.com/user-attachments/assets/1fd8fb3f-4923-4f8b-911b-11497a99a030" />

## 🛠️ Technologies Used

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Markdown Rendering**: React Markdown with remark-gfm
- **AI**: Google Gemini API (text generation and image generation)

## 🔧 Prerequisites

- Node.js (latest LTS version recommended)
- Google Gemini API key

## 🚀 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd autosage-the-vehicle-expert
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🧩 Project Structure

```
├── components/           # React components
│   ├── Header.tsx        # Application header
│   ├── ResponseDisplay.tsx # Display AI responses
│   ├── ScenarioCard.tsx  # Example scenario cards
│   ├── SearchBar.tsx     # Search input component
│   └── icons.tsx         # SVG icons
├── services/
│   └── geminiService.ts  # Google Gemini API integration
├── App.tsx              # Main application component
├── constants.ts         # Application constants
├── index.html           # HTML entry point
├── index.tsx            # React entry point
└── vite.config.ts       # Vite configuration
```

## 🔍 How It Works

1. **User Input**: Users can enter a query about vehicles or select from predefined scenarios.
2. **AI Processing**: The application sends the query to Google's Gemini AI models.
3. **Text Generation**: Gemini generates comprehensive, well-structured information about the vehicles.
4. **Image Generation**: In parallel, Gemini creates photorealistic images of the vehicles mentioned.
5. **Source Retrieval**: The application collects and displays the sources of information.
6. **Response Display**: The information is presented in a user-friendly format with tabs for text, sources, and images.

## 🔐 API Key Security

This application requires a Google Gemini API key to function. For security:

- Never commit your API key to version control
- Store your API key in a `.env` file which is excluded via `.gitignore`
- For production, use environment variables in your hosting platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Google Gemini for providing the AI models
- React and Vite communities for the excellent development tools
- All contributors and users of this application

---

<div align="center">

**AutoSage** - Your AI-powered vehicle expert

</div>
