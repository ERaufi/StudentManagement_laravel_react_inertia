// export default function Students() {
//     return (
//         <div>Students</div>
//     )
// }



import { usePage } from '@inertiajs/react';

export default function Students() {
    const { abc, dd } = usePage().props;

    return (
        <div>
            <h1>Students Page</h1>
            <p>abc: {abc}</p>
            <p>dd: {dd}</p>
        </div>
    );
}



