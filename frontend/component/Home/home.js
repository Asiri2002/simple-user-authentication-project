import React from "react";
import { motion } from "framer-motion";

function Home() {
  const cards = [
    {
      title: "👤 Users",
      desc: "Manage registration & login system",
      color: "#ff6b6b",
    },
    {
      title: "📄 PDF Upload",
      desc: "Upload and preview PDF files",
      color: "#4dabf7",
    },
    {
      title: "🖼 Images",
      desc: "Upload and display images easily",
      color: "#51cf66",
    },
    {
      title: "⚡ Fast API",
      desc: "Built with Node.js + Express",
      color: "#ffd43b",
    },
  ];

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.header}
      >
        <h1 style={styles.title}>🚀 MERN Dashboard</h1>
        <p style={styles.subtitle}>
          Welcome to your animated full-stack application
        </p>
      </motion.div>

      {/* CARDS */}
      <div style={styles.cardContainer}>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            style={{ ...styles.card, background: card.color }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.08, rotate: 1 }}
          >
            <h2>{card.title}</h2>
            <p>{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <motion.div
        style={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Made with ❤️ using MERN Stack + Framer Motion</p>
      </motion.div>

    </div>
  );
}

// ================= INLINE CSS =================
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "white",
    fontFamily: "Arial",
    textAlign: "center",
    padding: "30px",
  },

  header: {
    marginBottom: "40px",
  },

  title: {
    fontSize: "42px",
    margin: "10px 0",
  },

  subtitle: {
    fontSize: "18px",
    opacity: 0.85,
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },

  card: {
    width: "230px",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    cursor: "pointer",
  },

  footer: {
    marginTop: "60px",
    opacity: 0.8,
  },
};

export default Home;