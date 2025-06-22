<?php

namespace Database\Factories;

use App\Models\Teachers;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Classes>
 */
class ClassesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected static int $index = 0;
    public function definition(): array
    {
        $classes = [
            ['name' => 'Mathematics 101', 'description' => 'An introductory course covering the foundations of the subject.'],
            ['name' => 'Physics Fundamentals', 'description' => 'Explore real-world applications and critical thinking.'],
            ['name' => 'Chemistry Lab', 'description' => 'Hands-on experiments and group activities included.'],
            ['name' => 'World History', 'description' => 'Covers both ancient and modern historical perspectives.'],
            ['name' => 'Creative Writing', 'description' => 'Designed to enhance storytelling and writing skills.'],
            ['name' => 'Computer Science', 'description' => 'Covers algorithms, data structures, and basic programming.'],
            ['name' => 'Physical Education', 'description' => 'A focus on health, fitness, and athletic skills.'],
            ['name' => 'Art & Design', 'description' => 'Unleash your creativity through visual mediums.'],
            ['name' => 'Biology Basics', 'description' => 'Understand life from cells to ecosystems.'],
            ['name' => 'Philosophy Intro', 'description' => 'Discuss ideas that shaped human thought across centuries.'],
            ['name' => 'Economics Principles', 'description' => 'Learn the basic economic concepts and theories.'],
            ['name' => 'Psychology 101', 'description' => 'Introduction to human behavior and mental processes.'],
            ['name' => 'Environmental Science', 'description' => 'Study interactions between organisms and their environment.'],
            ['name' => 'Music Theory', 'description' => 'Fundamentals of musical notes, rhythm, and harmony.'],
            ['name' => 'Geography Essentials', 'description' => 'Learn about Earth\'s landscapes and climates.'],
            ['name' => 'Literature Classics', 'description' => 'Explore important literary works and their meanings.'],
            ['name' => 'Sociology Foundations', 'description' => 'Study social behaviors and human societies.'],
            ['name' => 'Political Science', 'description' => 'Understand political systems and governance.'],
            ['name' => 'Algebra II', 'description' => 'Advanced algebra topics and problem solving.'],
            ['name' => 'Calculus I', 'description' => 'Introduction to limits, derivatives, and integrals.'],
            ['name' => 'Statistics', 'description' => 'Learn to collect, analyze, and interpret data.'],
            ['name' => 'Astronomy', 'description' => 'Explore stars, planets, and the universe.'],
            ['name' => 'Health Education', 'description' => 'Focus on maintaining healthy lifestyles.'],
            ['name' => 'French Language', 'description' => 'Basics of French language and culture.'],
            ['name' => 'Spanish Language', 'description' => 'Basics of Spanish language and culture.'],
            ['name' => 'German Language', 'description' => 'Basics of German language and culture.'],
            ['name' => 'Photography', 'description' => 'Introduction to photography techniques.'],
            ['name' => 'Drama and Theater', 'description' => 'Learn acting skills and stage performance.'],
            ['name' => 'Journalism Basics', 'description' => 'Fundamentals of news writing and reporting.'],
            ['name' => 'Engineering Concepts', 'description' => 'Introduction to engineering principles.'],
            ['name' => 'Robotics', 'description' => 'Study robotic systems and automation.'],
            ['name' => 'Ethics and Morality', 'description' => 'Explore ethical theories and moral reasoning.'],
            ['name' => 'Digital Marketing', 'description' => 'Learn strategies for marketing in digital platforms.'],
            ['name' => 'Business Management', 'description' => 'Basics of managing and running businesses.'],
            ['name' => 'Graphic Design', 'description' => 'Learn principles of visual communication.'],
            ['name' => 'Film Studies', 'description' => 'Explore film history and analysis.'],
            ['name' => 'Data Science', 'description' => 'Introduction to data processing and analysis.'],
            ['name' => 'Creative Coding', 'description' => 'Combine creativity with computer programming.'],
            ['name' => 'Yoga and Wellness', 'description' => 'Practice physical and mental wellness techniques.'],
            ['name' => 'Anthropology', 'description' => 'Study human cultures and evolution.'],
            ['name' => 'Civics', 'description' => 'Learn about citizenship and government functions.'],
            ['name' => 'Debate Club', 'description' => 'Develop skills in argumentation and public debate.'],
            ['name' => 'Artificial Intelligence', 'description' => 'Explore basics and applications of AI.'],
            ['name' => 'Web Development', 'description' => 'Learn to build websites from scratch.'],
            ['name' => 'Human Anatomy', 'description' => 'Study human body systems and functions.'],
            ['name' => 'Marine Biology', 'description' => 'Explore marine ecosystems and organisms.'],
            ['name' => 'Financial Literacy', 'description' => 'Understand personal finance and money management.'],
            ['name' => 'Interior Design', 'description' => 'Learn fundamentals of designing interior spaces.'],
            ['name' => 'Public Speaking', 'description' => 'Improve communication and presentation skills.'],
            ['name' => 'World Religions', 'description' => 'Explore beliefs and practices around the world.'],
            ['name' => 'Chess Strategies', 'description' => 'Develop critical thinking through chess strategies.'],
            ['name' => 'Law and Justice', 'description' => 'Study laws and the justice system.'],
        ];

        $class = $classes[self::$index % count($classes)];
        self::$index++;

        return [
            'teacher_id' => Teachers::inRandomOrder()->value('id') ?? Teachers::factory(),
            'name' => $class['name'],
            'description' => $class['description'],
        ];
    }
}
