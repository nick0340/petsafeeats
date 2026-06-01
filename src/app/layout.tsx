import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatAssistant from '../components/ChatAssistant';

export const metadata = {
  title: 'PetSafe Eats - Can Your Pet Eat That? | Pet Food Safety Guide',
  description: 'Instantly check if any food is safe or toxic for your dog, cat, rabbit, bird & more. Expert-verified and always free.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-lexend flex flex-col">
        <Header />
        <main className="flex-1" role="main">
          {children}
        </main>
        <Footer />
        <ChatAssistant currentPet="dogs" />
      </body>
    </html>
  );
}
