// import React, { useState } from 'react';
// import { TextField, Button, Grid, Container, Typography } from '@mui/material';

// const CarForm = () => {
//   const [carData, setCarData] = useState({
//     make: '',
//     model: '',
//     year: '',
//     price: '',
//     miles: '',
//     condition: '',
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setCarData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // handle form submission logic here
//     console.log(carData);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Car Details Form
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Make"
//               variant="outlined"
//               fullWidth
//               name="make"
//               value={carData.make}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Model"
//               variant="outlined"
//               fullWidth
//               name="model"
//               value={carData.model}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Year"
//               variant="outlined"
//               fullWidth
//               name="year"
//               type="number"
//               value={carData.year}
//               onChange={handleChange}
//               InputProps={{ inputProps: { min: 1886, max: 2024 } }}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Price"
//               variant="outlined"
//               fullWidth
//               name="price"
//               type="number"
//               value={carData.price}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Miles"
//               variant="outlined"
//               fullWidth
//               name="miles"
//               type="number"
//               value={carData.miles}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Condition"
//               variant="outlined"
//               fullWidth
//               name="condition"
//               value={carData.condition}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//         </Grid>
//         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//           Submit
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default CarForm;

import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import axios from 'axios'; // Import axios for API calls

const BuyForm = () => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    miles: '',
    condition: '',
    email: '', // Add an email field
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to the backend API
      const response = await axios.post('/submit-car-data', carData);

      // Handle successful submission
      alert('Car data submitted successfully!');
      console.log(response.data);
    } catch (err) {
      // Handle error
      console.error('Error submitting form:', err);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Car Details Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Make"
              variant="outlined"
              fullWidth
              name="make"
              value={carData.make}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              name="model"
              value={carData.model}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              name="year"
              type="number"
              value={carData.year}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1886, max: 2024 } }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              type="number"
              value={carData.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Miles"
              variant="outlined"
              fullWidth
              name="miles"
              type="number"
              value={carData.miles}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Condition"
              variant="outlined"
              fullWidth
              name="condition"
              value={carData.condition}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email (Optional)"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              value={carData.email}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default BuyForm;
