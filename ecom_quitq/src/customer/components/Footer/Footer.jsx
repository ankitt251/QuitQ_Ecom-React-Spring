import React from "react";
import { Container, Grid, Typography, Link, Divider } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Divider />
      <Container
        maxWidth="lg"
        sx={{ py: 4, mt: 8, backgroundColor: "#f9f9f9" }}
      >
        <Grid container spacing={3} justifyContent="space-between">
          {/* Address Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.8 }}>
              J105 Hexaware Technologies Ltd.
              <br />
              Pune, Maharashtra - 4112007
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
            >
              Links
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/men", label: "Men" },
                { href: "/women", label: "Women" },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: "8px" }}>
                  <Link
                    href={link.href}
                    sx={{
                      color: "#666",
                      textDecoration: "none",
                      transition: "color 0.3s",
                      "&:hover": { color: "#333" },
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>

          {/* Help Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
            >
              Help
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { href: "/payment-options", label: "Payment Options" },
                { href: "/returns", label: "Returns" },
                { href: "/privacy-policies", label: "Privacy Policies" },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: "8px" }}>
                  <Link
                    href={link.href}
                    sx={{
                      color: "#666",
                      textDecoration: "none",
                      transition: "color 0.3s",
                      "&:hover": { color: "#333" },
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Divider sx={{ my: 3 }} />
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#999",
            fontSize: "14px",
          }}
        >
          © 2024 QuitQ. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
