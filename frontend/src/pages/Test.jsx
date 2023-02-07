import React, { useState, useEffect } from "react";

export default function Test(props) {
    const data = 5;
    return (
        <div>
            <div>Test</div>
            <div>{props.render(data)}</div>
        </div>
    );
}
