import React from 'react'
import ManaSymbol from '../../Components/ManaSymbol'

export const ManaSymbolTest = () => {
  return (
    <div style={{ fontSize: 20 }}>
      Tap this: <ManaSymbol symbol="{T}" /> <br />
      Pay 3 generic mana: <ManaSymbol symbol="{3}" /> <ManaSymbol symbol="{R}" /> <ManaSymbol symbol="{G}" />
      <br />
      Funny infinite mana: <ManaSymbol symbol="{_}" size={32} />
    </div>
  )
}
