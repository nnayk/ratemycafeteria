import { Autocomplete, TextField, Button } from '@mui/material';

// In your Hero component
export const Hero: React.FC = () => {
  return (
    <div className="bg-white min-h-[50vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Search a school to get started</h1>
      
      <div className="w-full max-w-md">
        <Autocomplete
          options={['School 1', 'Tchool 2', '$chool 3']} // Replace with your school list
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Enter school name"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#F59E0B', // Yellow border
                  },
                  '&:hover fieldset': {
                    borderColor: '#F59E0B',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#F59E0B',
                  },
                },
              }}
            />
          )}
        />
      </div>
      
      <div className="mt-8 flex space-x-2">
        <Button variant="outlined" color="primary" sx={{ borderColor: '#F59E0B', color: '#000' }}>
          Add a school
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderColor: '#F59E0B', color: '#000' }}>
          See all schools 
        </Button>
      </div>
    </div>
  );
};
