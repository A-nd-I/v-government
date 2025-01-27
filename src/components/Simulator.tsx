"use client";

import React, { useState } from 'react';

const Simulator: React.FC = () => {
    const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);

    const factors = [
        "Increase in unemployment",
        "Rise in cost of living",
        "Social protests",
        "Global economic crisis",
    ];

    const handleSelectFactor = (factor: string) => {
        if (selectedFactors.includes(factor)) {
            setSelectedFactors(selectedFactors.filter(f => f !== factor));
        } else {
            setSelectedFactors([...selectedFactors, factor]);
        }
    };

    const simulateImpact = () => {
        if (selectedFactors.length === 0) {
            setResult("Select at least one factor to simulate.");
        } else {
            setResult(
                `The combination of factors such as ${selectedFactors.join(", ")} could generate a significant impact on social and political stability.`
            );
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Scenario Simulator</h1>
            <p className="mb-4">Select one or more factors to simulate their impact:</p>
            <div className="grid grid-cols-1 gap-3 mb-4">
                {factors.map((factor, index) => (
                    <label key={index} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            value={factor}
                            checked={selectedFactors.includes(factor)}
                            onChange={() => handleSelectFactor(factor)}
                            className="form-checkbox"
                        />
                        <span>{factor}</span>
                    </label>
                ))}
            </div>
            <button
                onClick={simulateImpact}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Simulate Impact
            </button>
            {result && <p className="mt-4 p-4 bg-gray-100 rounded">{result}</p>}
        </div>
    );
};

export default Simulator;
