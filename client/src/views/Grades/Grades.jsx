import React from 'react';
import './Grades.less';

const GradesComponent = ({ learningStandard }) => {
    return (
        <div id='grades-section'>
        <h1 id='grades-title'>Performance and Grades</h1>
        {learningStandard.programs ? (
            learningStandard.programs.map((program) => (
            <div key={program.id} className='program-section'>
                <div className='program-name'>{program.name}</div>
                <div className='program-grade'>{program.grade}</div>
            </div>
            ))
        ) : (
            <p>No grades available.</p>
        )}
        </div>
    );
}

export default GradesComponent;