import React from "react";

export default function TableRow({ texts }) {
    return (
        <tr> {texts.map((text, i) => <td key={i}>{text}</td>)} </tr>
    );
}