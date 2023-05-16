import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";


export default function DateFilter({close}) {
    const [data, setData] = useState("");
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());

    registerLocale('pt-BR', ptBR);

    function handleDate1(date) {

        setStartDate1(date);
       
    }
    
    function handleDate2(date) {

        setStartDate2(date);
       
    }

    function handleConfirm() {
        let data = { 
            initialDate: startDate1.getTime(),
            finalDate: startDate2.getTime()
        
        };

        close(data);
    }
    
    
    return (
        <div>
            <span>De</span>
            <DatePicker
                         showIcon 
                         name="dataVencimento" 
                         id="dataVencimento" 
                         selected={startDate1}
                         onChange={handleDate1} 
                         showTimeSelect 
                         dateFormat="Pp" 
                         timeFormat="p"
                         locale="pt-BR"
                         timeInputLabel="Horas:"
                         timeIntervals={15}
                    />
           
            <span>Até</span>
            
            <DatePicker
                         showIcon 
                         name="dataVencimento" 
                         id="dataVencimento" 
                         selected={startDate2}
                         onChange={handleDate2} 
                         showTimeSelect 
                         dateFormat="Pp" 
                         timeFormat="p"
                         locale="pt-BR"
                         timeInputLabel="Horas:"
                         timeIntervals={15}
                    />

            <button onClick={handleConfirm}>Ok</button>
        </div>
    );
}