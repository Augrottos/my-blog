import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!token) {
      setStatus("Invalid Token");
      return;
    }

    // Use plain fetch — this endpoint does not require authentication
    fetch(`/api/verify-email?token=${encodeURIComponent(token)}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.msg);
        if (data.code === 200) {
          // Verification succeeded — redirect to login after a short delay
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
      })
      .catch(() => {
        setStatus("Network error. Please try again.");
      });
  }, [token]);

  return (
    <section className="section has-navbar-fixed-top">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-6">
            <div className="card">
              <div className="card-content" style={{ textAlign: "center", padding: "3rem" }}>
                <h1 className="title is-4">{status}</h1>
                {status && !status.includes("success") && (
                  <p className="has-text-grey mt-2">
                    <a href="/login">Go to login</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifyEmail;
