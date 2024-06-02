import React from 'react';
import { LastUserInDb } from './LastUserInDb';
import TypesInDb from './TypesInDb';

export function ContentRowCenter() {
    return (
        <div className="row">

            {/*<!-- Last User in DB -->*/}
            <LastUserInDb/>
            {/*<!-- End content row last User in Data Base -->*/}

            {/*<!-- Types in DB -->*/}
            <TypesInDb/>

        </div>
    )
}
