import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  FormControlLabel,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";

// Step titles
const stepTitles = [
  "Welcome to the Game Library!",
  "Explore Amazing Games!",
  "But first, sign this contract...",
  "You're All Set!",
];

// Content per step
const stepContent = [
  "This page is a showcase of Material UI components and games!",
  "You can browse various cool games, old and new!",
  "Before you proceed, please read and sign this extensive contract...",
  "Now that you know everything, let's head to the homepage!",
];

// Contract sections with unique accordions
const contractSections = [
  {
    title: "1. Playtime Obligations",
    content:
      "You agree to play games at least 3 hours per day. Any deviation from this rule will result in more playtime.",
  },
  {
    title: "2. Bug Complaints",
    content:
      "Complaining about bugs is prohibited. Bugs are features, not flaws. Embrace them as part of the experience.",
  },
  {
    title: "3. Pet All Dogs",
    content:
      "It is mandatory to pet all dogs in games that feature dogs. Failure to do so will result in revoked gaming privileges.",
  },
  {
    title: "4. Eternal Gaming",
    content:
      "Failure to follow these rules will result in eternal gaming. This means no breaks, no stopping—ever.",
  },
];

export default function SillyContractStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false); // For accordions
  const [formData, setFormData] = useState({
    fullName: "",
    agreedToTerms: false,
  });
  const [stepErrors, setStepErrors] = useState({
    contractIncomplete: false,
  });
  const router = useRouter();

  const handleNext = () => {
    if (activeStep === 2 && !validateContractStep()) {
      // Prevent moving forward if contract is incomplete
      return;
    }

    if (activeStep === stepTitles.length - 1) {
      router.push("/about");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setExpanded(false); // Close all accordions when moving to the next page
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      agreedToTerms: event.target.checked,
    });
  };

  // Validate the contract step (name and checkbox)
  const validateContractStep = () => {
    if (formData.fullName === "" || !formData.agreedToTerms) {
      setStepErrors({ contractIncomplete: true });
      return false;
    } else {
      setStepErrors({ contractIncomplete: false });
      return true;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Stepper with Titles */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepTitles.map((title, index) => (
          <Step key={title}>
            <StepLabel error={stepErrors.contractIncomplete && index === 2}>
              {title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Display Title and Content */}
      <Box sx={{ mt: 4, mb: 2, flex: 1 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {stepTitles[activeStep]}
        </Typography>
        <Typography variant="body1" align="center">
          {stepContent[activeStep]}
        </Typography>

        {/* Contract Step with Accordions */}
        {activeStep === 2 && (
          <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Please Read the Contract Below
              </Typography>

              {/* Accordions for Contract Sections */}
              <Tooltip title="This is an Accordion. It has a Summary and Details">
                <Box sx={{ mt: 3 }}>
                  {contractSections.map((section, index) => (
                    <Accordion
                      key={index}
                      expanded={expanded === `panel${index}`}
                      onChange={handleAccordionChange(`panel${index}`)}
                      sx={{
                        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":
                          {
                            transform: "rotate(90deg)",
                          },
                        "& .MuiAccordionSummary-content": {
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        },
                        mb: 2,
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}bh-content`}
                        id={`panel${index}bh-header`}
                        sx={{
                          bgcolor:
                            expanded === `panel${index}`
                              ? "primary.light"
                              : "background.paper",
                          color:
                            expanded === `panel${index}`
                              ? "primary.contrastText"
                              : "text.primary",
                        }}
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          {section.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{section.content}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Tooltip>

              {/* User Input for Signing the Contract */}
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Full Name"
                  variant="outlined"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={
                    stepErrors.contractIncomplete && formData.fullName === ""
                  }
                  helperText={
                    stepErrors.contractIncomplete && formData.fullName === ""
                      ? "Full Name is required"
                      : ""
                  }
                  sx={{ mb: 2, width: "300px" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreedToTerms}
                      onChange={handleCheckboxChange}
                      name="agreedToTerms"
                    />
                  }
                  label="I agree to the terms and conditions of this very silly contract"
                />
                {stepErrors.contractIncomplete && !formData.agreedToTerms && (
                  <Typography color="error">
                    You must agree to the terms before proceeding.
                  </Typography>
                )}
              </Box>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Navigation Buttons at the bottom */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          sx={{ position: "fixed", bottom: 16, left: 16 }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          {activeStep === stepTitles.length - 1 ? "Go Home" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
