import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SampleSelect() {
  const dummyMakers = [
    { id: 1, name: "Toyota" },
    { id: 2, name: "Honda" },
    { id: 3, name: "Mazda" },
    { id: 4, name: "Nissan" },
  ];
  const [maker, setMaker] = React.useState(dummyMakers[0]);

  const handleChange = (event) => {
    setMaker(event.target.value);
  };

  const makerOptions = dummyMakers.map((maker) => <MenuItem value={maker.id}>{maker.name}</MenuItem>);

  return (
    <Box className="m-10">
      <div className="grid grid-cols-2">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Source Maker</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={maker}
            label="Age"
            onChange={handleChange}
          >
            {makerOptions}
          </Select>
        </FormControl>

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Target Maker</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={maker}
            label="Age"
            onChange={handleChange}
          >
            {makerOptions}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}

export default SampleSelect;
