import React from 'react';
import { Star, Palette, Stars } from '@mui/icons-material';
import { Container, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';

const featuresData = [
  {
    icon: <Star style={{ fontSize: '50px', color: '#CFC4B9' }} />, // Updated to gold
    title: 'A Legacy of Luxury',
    description:
      'At Gaberina, we don’t just craft perfumes; we create legacies. Infused with timeless elegance, each fragrance tells a story of royalty and sophistication, designed for those who appreciate the finer things in life.',
  },
  {
    icon: <Palette style={{ fontSize: '50px', color: '#CFC4B9' }} />, // Updated to gold
    title: 'Perfume as an Art',
    description:
      'Gaberina’s perfumes are the result of a meticulous craft, honed through generations of expertise. Our artisans hand-select the rarest ingredients from every corner of the globe, blending them with precision.',
  },
  {
    icon: <Stars style={{ fontSize: '50px', color: '#CFC4B9' }} />, // Updated to gold
    title: 'An Invitation to the Elite',
    description:
      'Gaberina is not just a perfume; it’s an invitation to join a rarefied world. Our fragrances embody the grace, strength, and nobility of a royal lineage, designed for those who demand nothing less than perfection.',
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Features = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ color: '#BFA253', fontFamily: 'Times New Roman', fontWeight: 'bold' }} // Title as champagne
        >
          Step into the Realm of Royalty
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#F7E7CE' }}>
          Indulge in the luxury of Gaberina—where craftsmanship meets the grandeur of royalty.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {featuresData.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Animation triggers when 20% of the element is in view
            >
              <Box
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: '#1C1C1C',
                  borderRadius: 2,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Box mb={2}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{ color: '#D4AF37', fontFamily: 'Playfair Display', fontWeight: 'bold' }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ color: '#FDFBF6', mt: 2, fontSize: '14px' }}>
                  {feature.description}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
