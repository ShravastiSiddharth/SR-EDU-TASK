<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .card {
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        .card-header {
            background-color: #007bff;
            color: white;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 1rem 1.5rem;
        }
        .card-body {
            padding: 1.5rem;
            font-size: 1rem;
            line-height: 1.6;
        }
        .card-body p {
            margin-bottom: 1rem;
        }
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #343a40;
            color: white;
            text-align: center;
            padding: 1rem 0;
        }
        .btn-logout {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .btn-logout:hover {
            background-color: #c82333;
            transform: translateY(-2px);
        }
        .btn-logout:focus {
            outline: none;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
<body>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card mb-4">
                    <div class="card-header text-center">
                        <h4>Welcome, {{ $user->name }}</h4>
                    </div>
                    <div class="card-body text-center">
                        <p>Email: {{ $user->email }}</p>
                    </div>
                </div>

                <!-- New Content Section -->
                <!-- New Content Section -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>The New Way to Success</h5>
                    </div>
                    <div class="card-body">
                        <p>Advance Progress</p>
                        <p>Transforming Education, One Innovative Solution at a Time. At SR Edu Tech, we're dedicated to redefining learning experiences, fostering creativity, and preparing learners for a brighter, more connected future. With cutting-edge technology and a passion for education, we're shaping the leaders of tomorrow.</p>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Who We Are</h5>
                    </div>
                    <div class="card-body">
                        <p>SR EDU TECH, founded in 2005 by Mrs. Sujatha Reddy, is a dynamic educational company committed to enhancing students' skills and providing tech support for school management. Recognizing the limitations of traditional education, Mrs. Sujatha Reddy, a teacher herself, introduced knowledge-based courses like Abacus, Vedic/Speed Math, Spoken English, Robotics, and AI to empower students in today's competitive world.</p>
                        <p>Operating across India, SR Edu Tech has reached over 1450 schools, spanning the entire country from East to West, North to South. Their impactful courses have garnered praise from school management, faculty, students, and parents, fostering overall student development and readiness for the challenges of the real world.</p>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Our Vision</h5>
                    </div>
                    <div class="card-body">
                        <p>At SR EDU TECH, our vision is to lead an educational revolution, transcending boundaries to provide innovative, knowledge-based courses that empower students worldwide. We're dedicated to erasing limitations in traditional education, enabling all students, regardless of their background or location, to access personalized learning experiences. Our aim is to equip students with essential skills and instill a passion for lifelong learning, preparing them to excel in an increasingly competitive and dynamic world. Through relentless innovation and unwavering integrity, we are committed to reshaping the future of education for the better.</p>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Our Mission</h5>
                    </div>
                    <div class="card-body">
                        <ul>
                            <li>Empowering Learners: Equipping students with essential knowledge and skills to excel in a competitive global landscape.</li>
                            <li>Enabling Educators: Offering cutting-edge tech support and resources for educators and school management.</li>
                            <li>Driving Innovation: Continuously pioneering new educational approaches and technologies.</li>
                            <li>Access for All: Expanding access to quality education across the length and breadth of India.</li>
                            <li>Community Building: Fostering a collaborative educational community that includes schools, teachers, students, and parents.</li>
                        </ul>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Our Values</h5>
                    </div>
                    <div class="card-body">
                        <p>At SR EDU TECH, our values are the foundation of everything we do. We cherish innovation, continuously pushing boundaries in educational technology. We are passionate about inclusivity, ensuring that quality education is accessible to all. Empowerment drives us, as we equip students and educators to unlock their full potential. We uphold unwavering integrity in all our endeavors and believe in the power of continuous improvement. We celebrate diversity, fostering collaboration among all stakeholders, and build a vibrant community where learning thrives. These values guide our mission to reshape education positively.</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5>Our Ethics</h5>
                    </div>
                    <div class="card-body">
                        <p>At SR EDU TECH, we hold our ethical principles in the highest regard, as they define the essence of our organization. Integrity is the cornerstone of our operations, with a commitment to transparent, honest, and ethical conduct permeating all aspects of our work. We prioritize the welfare of our students, educators, and partners, ensuring their well-being through fair and equitable treatment. Respect for privacy and data security is paramount; we uphold stringent standards to safeguard personal information and create a secure learning environment. We are unwavering in our dedication to regulatory compliance and best practices, fostering responsible business conduct. Our ethical compass guides us in providing accessible, valuable, and innovative educational solutions. We recognize the importance of promoting diversity, inclusivity, and collaboration in our educational community.</p>
                    </div>
                </div>
                <!-- End of Content Section -->
            </div>
        </div>
    </div>

                <!-- Other Content Sections -->

            </div>
        </div>
    </div>

    <footer class="footer">
        <button id="logout-button" class="btn-logout">Logout</button>
    </footer>

    <script>
        $(document).ready(function() {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $('#logout-button').on('click', function() {
                $.ajax({
                    url: "{{ route('logout') }}",
                    type: 'POST',
                    success: function(response) {
                        window.location.href = "{{ route('login') }}";
                    },
                    error: function(xhr) {
                        console.log(xhr.responseText);
                        alert('Error logging out!');
                    }
                });
            });
        });
    </script>
</body>
</html>
