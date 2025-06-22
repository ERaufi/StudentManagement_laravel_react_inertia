<?php

namespace Database\Factories;

use App\Models\Classes;
use App\Models\Students;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class StudentClassesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => Students::inRandomOrder()->value('id') ?? Students::factory(),
            'class_id' => Classes::inRandomOrder()->value('id') ?? Classes::factory(),
            'score' => $this->faker->optional()->numberBetween(0, 100),
        ];
    }
}
