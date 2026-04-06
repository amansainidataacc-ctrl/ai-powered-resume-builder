import React, { useEffect, useState } from "react";

type ResumeState = {
  name: string;
  phone: string;
  email: string;
  summary: string;
  // add other fields here as needed
};

export default function ResumeForm() {
  const [form, setForm] = useState<ResumeState>({
    name: "",
    phone: "",
    email: "",
    summary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // RESET FORM: clears state and any persisted draft
  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      summary: "",
    });

    // If you persist drafts in localStorage or other client storage,
    // clear or reinitialize them here:
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("resumeDraft");
      }
    } catch (e) {
      // ignore localStorage errors in strict environments
      console.warn("Could not clear resumeDraft from localStorage", e);
    }
  };

  // Option A: reset on mount so old values won't re-populate when creating new resume
  useEffect(() => {
    resetForm();
  }, []);

  // Controlled onChange helper
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // AI generation client call: calls your server-side API route at /api/generate-summary
  const handleGenerateSummary = async () => {
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch("/api/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // send helpful context for generation
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
        }),
      });

      // Log status for debugging
      console.log("AI generate response status:", resp.status);

      // If network-level error occurs fetch will throw; if server returns non-OK, handle it here
      if (!resp.ok) {
        const text = await resp.text().catch(() => "<no body>");
        console.error("AI generate failed - status:", resp.status, "body:", text);
        setError(`AI generation failed: ${resp.status} ${resp.statusText}`);
        setLoading(false);
        return;
      }

      const data = await resp.json();
      // Expect data.summary
      if (data?.summary) {
        setForm((prev) => ({ ...prev, summary: data.summary }));
      } else {
        console.warn("AI generate returned unexpected payload:", data);
        setError("AI returned unexpected response shape.");
      }
    } catch (err: unknown) {
      // Detailed network / CORS diagnostic logging
      if (err instanceof Error) {
        console.error("Network or fetch error:", err);
        // Common cause for "Failed to fetch" from the browser: CORS, server down, DNS or network issue.
        // If you see "TypeError: Failed to fetch" with no further info, check server API route logs or CORS headers.
        setError(`Network error: ${err.message}`);
      } else {
        console.error("Unknown error thrown during fetch:", err);
        setError("Unknown network error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Example submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // perform download or other actions
    // After download if you want to start a new resume, call resetForm()
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          // Force light background and dark text for high contrast:
          className="w-full px-3 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Jane Doe"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="+1 (555) 555-5555"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Summary</label>
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          rows={6}
          className="w-full px-3 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical"
          placeholder="Professional summary..."
        />
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={loading}
            className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "AI Generate"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center px-3 py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Start New Resume
          </button>
        </div>

        {error && <p className="mt-2 text-sm text-red-600">Error: {error}</p>}
      </div>

      <div className="mt-6">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save / Download Resume
        </button>
      </div>
    </form>
  );
}
