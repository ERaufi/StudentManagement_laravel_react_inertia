<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teachers>
 */
class TeachersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $year = now()->year;
        $month = rand(1, 12);
        $day = rand(1, 28); // Safe for all months

        $createdAt = now()->setDate($year, $month, $day)->startOfDay();

        return [
            'user_id' => User::factory()->create(['user_type' => 'teacher'])->id,
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber,
            'created_at' => $createdAt,
        ];
    }
}
