import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

export default function Pagination({ increment, decrement, type }) {

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={type.decrement}
        onClick={decrement}
      >
        Назад
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={type.increment}
        onClick={increment}
      >
        Вперёд
      </Button>
    </div>
  );
}
