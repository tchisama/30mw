"use client"

import { Field, UserCollection, me } from "@/types/collection";
import { useState } from "react";



interface ComplexObject {
  [key: string]: any;
}


const Component = () => {
    const [formData, setFormData] = useState<ComplexObject>(me);

  const handleChange = (key: string, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const renderFields = (obj: ComplexObject) => {
    return Object.keys(obj).map((key, index) => {
      const value = obj[key];
      if (typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div key={index}>
            <h4>{key}</h4>
            {renderFields(value)}
          </div>
        );
      } else {
        return (
          <div key={index}>
            <label>{key}</label>
            <input
              type="text"
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        );
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Do something with updated formData
    console.log(formData);
  };

  return (
    <div>
      {
        UserCollection.structure.map((field: Field) => {
          return <div key={field.name}></div>
        })
      }
    </div>
      
  );
}