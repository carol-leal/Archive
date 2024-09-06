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
  Pagination,
  FormControlLabel,
  Paper,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ROUTES } from "../utils/routes";
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

// Contract sections with unique accordions per page
const contractPages = [
  {
    content:
      "You agree to play games at least 3 hours per day. Deviating from this rule results in even more playtime.",
    accordionDetails: [
      {
        title: "Why 3 Hours?",
        details:
          "Studies show that 3 hours of gaming per day is the optimal amount for happiness.",
      },
      {
        title: "Penalty for Missing a Day",
        details:
          "If you miss a day of gaming, you must make up for it by gaming for 6 hours the next day.",
      },
    ],
  },
  {
    content:
      "You are prohibited from complaining about bugs in games. Bugs are part of the experience, enjoy them.",
    accordionDetails: [
      {
        title: "Dealing with Bugs",
        details: "Learn to embrace bugs. They are features in disguise, right?",
      },
      {
        title: "Submit a Meme Instead",
        details:
          "If you encounter a bug, submit a meme about it. Humor is the best bug report.",
      },
    ],
  },
  {
    content:
      "It is mandatory to pet all dogs in games that feature dogs. Failure to do so is not an option.",
    accordionDetails: [
      {
        title: "Why Pet Dogs?",
        details: "Because dogs are the goodest boys and deserve all the love.",
      },
      {
        title: "Dog Petting Penalties",
        details:
          "Failure to pet dogs will result in an immediate loss of gaming privileges.",
      },
    ],
  },
  {
    content:
      "Failure to follow these terms will result in eternal gaming. Yes, forever.",
    accordionDetails: [
      {
        title: "Eternal Gaming",
        details:
          "Once committed, there is no way out. Keep gaming forever. No exceptions.",
      },
      {
        title: "But Why?",
        details:
          "Because eternal gaming is the only logical outcome for such a fun experience.",
      },
    ],
  },
];

export default function SillyContractStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [contractPage, setContractPage] = useState(1); // Tracks the pagination page
  const [expanded, setExpanded] = useState<string | false>(false); // For accordions
  const [formData, setFormData] = useState({
    fullName: "",
    agreedToTerms: false,
  });
  const router = useRouter();

  const handleNext = () => {
    if (activeStep === stepTitles.length - 1) {
      router.push(ROUTES.home);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setContractPage(1); // Reset pagination for contract step
      setExpanded(false); // Close all accordions when moving to the next page
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setContractPage(value);
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

  const canShowNextButton = formData.fullName !== "" && formData.agreedToTerms;

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      {/* Stepper with Titles */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepTitles.map((title, index) => (
          <Step key={title}>
            <StepLabel>{title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Display Title and Content */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {stepTitles[activeStep]}
        </Typography>
        <Typography variant="body1" align="center">
          {stepContent[activeStep]}
        </Typography>
      </Box>

      {/* Contract Pages with Pagination */}
      {activeStep === 2 && (
        <Box>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Silly Contract - Page {contractPage}
            </Typography>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="body1" align="center">
                  {contractPages[contractPage - 1].content}
                </Typography>
              </CardContent>
            </Card>

            {/* Accordions for More Contract Details */}
            <Box sx={{ mt: 3 }}>
              {contractPages[contractPage - 1].accordionDetails.map(
                (section, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleAccordionChange(`panel${index}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}bh-content`}
                      id={`panel${index}bh-header`}
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        {section.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{section.details}</Typography>
                    </AccordionDetails>
                  </Accordion>
                )
              )}
            </Box>

            {/* User Input for Signing the Contract */}
            {contractPage === contractPages.length && (
              <Box
                sx={{
                  mb: 2,
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
                  error={formData.fullName === ""}
                  helperText={
                    formData.fullName === "" ? "Full Name is required" : ""
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
                {!formData.agreedToTerms && (
                  <Typography color="error">
                    You must agree to the terms before proceeding.
                  </Typography>
                )}
              </Box>
            )}
          </Paper>

          {/* Pagination Below Content */}
          <Pagination
            count={contractPages.length}
            page={contractPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ display: "flex", justifyContent: "center", mt: 3 }}
          />

          {/* Show "Next" button only on last contract page and when all conditions are met */}
          {contractPage === contractPages.length && canShowNextButton && (
            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* Navigation Buttons for Other Steps */}
      {activeStep !== 2 && (
        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>

          <Button variant="contained" onClick={handleNext}>
            {activeStep === stepTitles.length - 1 ? "Go Home" : "Next"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
