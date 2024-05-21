export default {
  control: {
    fontSize: 14,
    fontWeight: "normal",
    height: 40,
    width: 270,
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      borderRadius: "35px",
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: "8px 6px 4px 9px",
      border: "2px solid silver",
      borderRadius: "35px",
      height: 35,
      fontSize: 16,
    },
  },

  "&singleLine": {
    display: "inline-block",
    fontSize: 14,
    fontWeight: "normal",
    height: 35,
    width: 270,

    highlighter: {
      padding: 9,
      border: "2px solid transparent",
      color: "red",
    },
    input: {
      padding: 9,
      border: "2px solid silver",
      borderRadius: "35px",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 600,
      position: "absolute",
      marginBottom: 20,
      bottom: "100%",
      left: "10%",
    },
    item: {
      margin: 0,
      padding: "3px 6px",
      width: 140,
      borderRadius: 5,
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};
