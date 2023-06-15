import React from 'react';

const DepartmentTotalCard = ({ color = 'primary', total, title }) => {
  return (
    <>
      <Card
        // onMouseEnter={() => setFlipped(true)}
        sx={{
          pt: 2,
          pb: 2,
          boxShadow: 0,
          textAlign: 'center',
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
      ></Card>
    </>
  );
};

export default DepartmentTotalCard;
