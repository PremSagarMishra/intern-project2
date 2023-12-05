import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  department: string;
  sub_departments: string[];
}

interface SubDepartmentsListProps {
  departments: Department[];
}

const SubDepartmentsList: React.FC<SubDepartmentsListProps> = ({ departments }) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (value: string) => () => setSelected((prevSelected) => {
    const currentIndex = prevSelected.indexOf(value);
    return currentIndex === -1
      ? [...prevSelected, value]
      : [...prevSelected.slice(0, currentIndex), ...prevSelected.slice(currentIndex + 1)];
  });

  const handleExpand = (value: string) => () => setExpanded((prevExpanded) => {
    const isExpanded = prevExpanded.includes(value);
    return isExpanded
      ? prevExpanded.filter((dep) => dep !== value)
      : [...prevExpanded, value];
  });

  const isSelected = (value: string) => selected.includes(value);

  const isSubDepartmentsSelected = (department: string) =>
    departments.find((dep) => dep.department === department)?.sub_departments.every((subDep) =>
      isSelected(`${department}_${subDep}`)
    );

  const handleSelectAllSubDepartments = (department: string, subDepartments: string[]) => () => {
    const allSubDepartmentsSelected = isSubDepartmentsSelected(department);

    const newSelected = selected.filter((sel) => !sel.startsWith(`${department}_`));

    if (!allSubDepartmentsSelected) {
      newSelected.push(...subDepartments.map((subDep) => `${department}_${subDep}`));
    }

    setSelected(newSelected);
  };

  return (
    <List>
      {departments.map(({ department, sub_departments }) => (
        <React.Fragment key={department}>
          <ListItem button onClick={handleExpand(department)}>
            <ListItemIcon>
              {expanded.includes(department) ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <Checkbox
              edge="start"
              checked={isSubDepartmentsSelected(department)}
              tabIndex={-1}
              disableRipple
              onClick={handleSelectAllSubDepartments(department, sub_departments)}
            />
            <ListItemText primary={department} />
          </ListItem>
          <Collapse in={expanded.includes(department)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sub_departments.map((subDepartment) => (
                <ListItem
                  key={`${department}_${subDepartment}`}
                  button
                  onClick={handleToggle(`${department}_${subDepartment}`)}
                  style={{ paddingLeft: 40 }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isSelected(`${department}_${subDepartment}`)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': subDepartment }}
                    />
                  </ListItemIcon>
                  <ListItemText id={subDepartment} primary={subDepartment} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default SubDepartmentsList;
