<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StatisticsSeeder extends Seeder
{
    public function run()
    {
        // Ngày cần thêm dữ liệu
        $dates = [
            '2024-08-25',
            '2024-08-26',
            '2024-08-27',
            '2024-08-28',
        ];

        foreach ($dates as $date) {
            DB::table('statistics')->updateOrInsert(
                ['date' => $date],
                [
                    'total_users' => rand(50, 100), // Giả lập số lượng người dùng
                    'total_orders' => rand(20, 50), // Giả lập số lượng đơn hàng
                    'total_sales' => rand(1000, 5000), // Giả lập tổng doanh thu
                    'updated_at' => now(),
                ]
            );
        }
    }
}
