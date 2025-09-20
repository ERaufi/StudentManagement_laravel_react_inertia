<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Student Report</title>
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; font-size: 13px; }
        h2 { text-align: center; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
    </style>
</head>
<body>
    <h2>Report Card</h2>
    <p><strong>Student:</strong> {{ $student->name }}</p>
    <p><strong>Email:</strong> {{ $student->email }}</p>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Class</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            @foreach($student->studentClasses as $sc)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $sc->class->name }}</td>
                    <td>{{ $sc->score ?? 'N/A' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
