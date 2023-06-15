import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        minWidth: 'auto', // Set the minimum width to auto
        whiteSpace: 'nowrap', // Prevent line breaks within the button text
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        '@media (max-width:600px)': {
          root: {
            fontSize: '14px', // Adjust font size for xs size
          },
          sizeLarge: {
            height: '36px', // Adjust height for xs size
            padding: '8px 16px', // Adjust padding for xs size
          },
          containedInherit: {
            // Adjust styles for xs size
            color: 'red',
            // ...
          },
          containedPrimary: {
            // Adjust styles for xs size
            // ...
          },
          containedSecondary: {
            // Adjust styles for xs size
            // ...
          },
          outlinedInherit: {
            // Adjust styles for xs size
            // ...
          },
          textInherit: {
            // Adjust styles for xs size
            // ...
          },
        },
      },
    },
  };
}
