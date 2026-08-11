import React from "react";

export default function Footer() {
  return (
    <footer className="bg-body-tertiary border-top py-3 mt-5">
      <div className="container text-center small text-muted">
        © {new Date().getFullYear()} The Roasted Bean Cafe 
      </div>
    </footer>
  );
}
