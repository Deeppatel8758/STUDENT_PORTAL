import React, { useState } from "react";

export default function HomePage() {
  return (
    <main>
      <a href="/admin">
        <h1>Admin dashboard </h1>
      </a>
      <a href="/department">
        <h1>Department dashboard</h1>
      </a>
      <a href="/student">
        <h1>Student dashboard </h1>
      </a>
    </main>
  );
}
