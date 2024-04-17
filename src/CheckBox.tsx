import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    completed: boolean;
  }

export function Checkbox({ label, checked, onChange, completed }:CheckboxProps) {
    return (
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={checked}
            onChange={onChange}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon style={{ color: "green" }} />}
            inputProps={{ "aria-label": "Checkbox" }}
          />
        }
        label={
          <span className={`taskText ${completed ? "completed" : ""}`}>
            {label}
          </span>
        }
      />
    );
  }